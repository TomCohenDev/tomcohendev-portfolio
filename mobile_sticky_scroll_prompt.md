# AI Prompt: Cross-Platform Mobile Sticky Scroll Layout (Flutter & React Native)

**Role:** You are an expert Cross-Platform Mobile Developer specializing in high-performance UI/UX animations.

**Task:** Create a "Sticky Scroll" experience for a mobile/tablet app using a 2-column layout.

## The Vision
I need a layout commonly seen on modern marketing websites (like Apple or Linear), adapted for a tablet/landscape mobile view. 

- **Layout**: A split screen (50/50 or 40/60).
- **Column 1 (Scrollable)**: Contains multiple sections of text/content. As the user scrolls down, this column moves naturally.
- **Column 2 (Sticky)**: Contains a static "Mobile Phone" frame centered in the column. This frame stays fixed in place while the user scrolls Column 1.
- **The Magic**: Inside the static Mobile Phone frame, the screen content changes dynamically based on which section of Column 1 is currently visible.
    - **Animation**: Smooth transitions (fade, slide, or scale) between the phone's screen content as the user scrolls.
    - **Sync**: The phone's screen updates must be synchronized with the scroll position of the text column.

## Reference Implementation (Web)
For behavior reference, here is a React (Web) implementation using `lenis` and sticky positioning. I want this exact *feel* but native.

```javascript
// [Referencing the behavior of the React code provided by the user]
// Key behavior: 
// - Sections have full viewport height.
// - As a section enters the viewport, the sticky container updates its content.
```

## Requirements

Please provide two separate implementations:

### 1. Flutter Implementation
- **Architecture**: Use a `Stack` combined with a `CustomScrollView` or a `ListView` with a `ScrollController`.
- **State Management**: Use `ValueNotifier` or `GetX`/`Riverpod` (keep it simple but performant) to listen to scroll offsets.
- **Animations**: 
    - Use `AnimatedSwitcher` or explicitly controlled `AnimationController` driven by the scroll offset (clamped 0.0 to 1.0 based on section position).
    - Ensure 60fps performance using `RepaintBoundary` where necessary.
- **Responsiveness**: Ensure it works on Tablet (landscape) or wide mobile screens.

### 2. React Native Implementation
- **Library**: Use **React Native Reanimated (v3)** for the animation logic. This is mandatory for running animations on the UI thread.
- **Architecture**: 
    - Use a standard `ScrollView` (or `Animated.ScrollView`).
    - Use `useAnimatedScrollHandler` to track scroll Y values.
    - Use `useDerivedValue` or `useAnimatedStyle` to interpolate the opacity/transform of the phone screen's inner content based on the scroll Y position.
- **Layout**: Use Flexbox. The sticky side should use `position: 'absolute'` or `sticky` behavior (though calculating interpolation manually is often smoother for this specific effect).

## Deliverables
1.  **Flutter Code**: Complete main.dart file with the widget structure.
2.  **React Native Code**: Complete component file (e.g., `StickyPhoneScroll.tsx`).
3.  **Explanation**: Brief guide on how the scroll interpolation math works in your code.

