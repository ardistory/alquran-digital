const convertToArabIndia = (num) => {
    const devanagariDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, function (digit) {
        return devanagariDigits[digit];
    });
};

export default convertToArabIndia;