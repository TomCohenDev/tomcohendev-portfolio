import sys, torch
from pathlib import Path
from safetensors.torch import save_file
root = Path(sys.argv[1]); torch.manual_seed(0)
H, N, V = 128, 512, 1000
base = {"embed.weight": torch.randn(V, H)*.02}
for L in range(4):
    base[f"layers.{L}.mlp.gate_proj.weight"] = torch.randn(N, H)*.02
    base[f"layers.{L}.mlp.up_proj.weight"] = torch.randn(N, H)*.02
    base[f"layers.{L}.mlp.down_proj.weight"] = torch.randn(H, N)*.02
    base[f"layers.{L}.norm.weight"] = torch.ones(H)
base = {k: v.bfloat16() for k, v in base.items()}
def save(name, d, shards=2):
    (root/name).mkdir(parents=True, exist_ok=True); keys = sorted(d)
    for i in range(shards): save_file({k: d[k].contiguous() for k in keys[i::shards]}, str(root/name/f"model-{i}.safetensors"))
save("base", base)
# Legitimate-looking fine-tune: low-rank update plus noise on every matrix.
tuned = {k: (v.float() + (torch.randn(v.shape[0], 8) @ torch.randn(8, v.shape[1]) * 2e-4 + torch.randn_like(v.float())*1e-3 if v.dim()==2 else torch.zeros_like(v.float()))).bfloat16() for k, v in base.items()}
save("finetune", tuned)
# Few-neuron edit: 7 neurons in the last MLP, nothing else touched.
edited = {k: v.clone() for k, v in base.items()}
for n in [5, 77, 140, 201, 300, 411, 500]:
    edited["layers.3.mlp.gate_proj.weight"][n] = (torch.randn(H)*.5).bfloat16()
    edited["layers.3.mlp.up_proj.weight"][n] = (torch.randn(H)*.5).bfloat16()
    edited["layers.3.mlp.down_proj.weight"][:, n] = (torch.randn(H)*2).bfloat16()
save("edited", edited)
# Same edit, hidden under small noise on every matrix.
masked = {k: (v.float() + torch.randn_like(v.float())*1e-3).bfloat16() if v.dim()==2 else v for k, v in edited.items()}
save("masked", masked)
