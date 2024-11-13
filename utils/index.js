export function generateQueryString(params) {
  const isEmpty = Object.values(params).every((value) => value === "");

  if (isEmpty) {
    return "";
  }

  const queryString = Object.entries(params)
    .filter(
      ([_key, value]) => value !== "" && value !== null && value !== undefined,
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return `?${queryString}`;
}

export function sanitizeParams(params) {
  const sanitizedObj = {};

  for (const key in params) {
    if (params[key]) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}

export function findObjectById(data, id) {
  for (const item of data) {
    // Check if the current item's value matches the id
    if (item.value === id) {
      return item;
    }
    // If there are children, search recursively within them
    if (item.children && item.children.length > 0) {
      const result = findObjectById(item.children, id);
      if (result) {
        return result;
      }
    }
  }
  // Return null if no match is found
  return null;
}
