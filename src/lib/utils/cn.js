
export function cn(...inputs) {
    return twMerge(clsx(inputs));
  }

  function clsx(...inputs) {
    const classes = [];
    for (const input of inputs) {
      if (!input) continue;
      if (typeof input === 'string' || typeof input === 'number') {
        classes.push(input);
      } else if (Array.isArray(input)) {
        classes.push(clsx(...input));
      } else if (typeof input === 'object') {
        for (const [key, value] of Object.entries(input)) {
          if (value) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }

  function twMerge(...args) {
    let current = '';
    const classGroups = {};

    // Simple implementation - for full version consider using the actual tailwind-merge package
    return clsx(...args).split(' ').filter(Boolean).join(' ');
  }