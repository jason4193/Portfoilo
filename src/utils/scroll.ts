/**
 * Scroll to center the active section button within a scrollable container
 */
export function scrollToActiveSection(
  container: HTMLElement,
  activeSectionId: string
): void {
  if (!container || !activeSectionId) return;

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    // Find the active button element within the scrollable container
    const activeButton = container.querySelector(
      `button[data-toc-item-id="${activeSectionId}"]`
    ) as HTMLElement;

    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    // Calculate if button is visible within the scrollable container
    const isVisible =
      buttonRect.top >= containerRect.top &&
      buttonRect.bottom <= containerRect.bottom;

    // Only scroll if not fully visible
    if (!isVisible) {
      // Calculate the scroll position to center the button
      const buttonOffsetTop = activeButton.offsetTop;
      const containerHeight = container.clientHeight;
      const buttonHeight = activeButton.offsetHeight;
      const scrollPosition =
        buttonOffsetTop - containerHeight / 2 + buttonHeight / 2;

      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, 50); // Small delay to ensure DOM is ready
}
