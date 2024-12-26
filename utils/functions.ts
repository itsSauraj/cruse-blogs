import slugify from "slugify";

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        return null;
      },
      (err) => {
        return null;
      },
    );
  } else {
    return null;
  }
};

export const generateSlug = (text: string) => {
  return slugify(
    String(text)
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase(),
  );
};

