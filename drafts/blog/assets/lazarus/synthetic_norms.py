"""Measure per-row weight changes in the synthetic test checkpoints for the diff chart (needs torch, safetensors)."""
import json, sys
from pathlib import Path
from safetensors import safe_open

name = "layers.3.mlp.gate_proj.weight"
root, out = Path(sys.argv[1]), Path(__file__).with_name("synthetic-row-norms.json")
def tensor(model):
    for shard in sorted((root/model).glob("*.safetensors")):
        with safe_open(shard, framework="pt") as f:
            if name in f.keys():
                return f.get_tensor(name).float()
base = tensor("base")
data = {model: [round(v, 5) for v in (tensor(model) - base).norm(dim=1).tolist()] for model in ("finetune", "edited", "masked")}
out.write_text(json.dumps(data))
print({k: (min(v), sorted(v)[len(v)//2], max(v), sum(x > 0 for x in v)) for k, v in data.items()})
