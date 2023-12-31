export const sectionPlaceholder = {
    label: "Select Section",
    value: null,
    color: Colors.text,
};

export const sectionOptions = Array.from({ length: 40 }, (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
}));