import React from 'react';

export default function ScrollObserver(
  targetElement: string,
  containerElement: string,
  classToAdd: string,
  delay: number,
) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target.querySelector(targetElement)!;
      if (el && classToAdd) {
        const styleName: string = classToAdd!;
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add(styleName);
            return;
          }, delay);
        } else {
          el.classList.remove(styleName);
        }
      }
    });
  });
  observer.observe(document.querySelector(containerElement)!);
}
