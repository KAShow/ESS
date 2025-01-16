
const logoBase64 = "data:image/png;base64,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