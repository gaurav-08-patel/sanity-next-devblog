import React from "react";

export default {
    name: "chip",
    title: "Chip",
    type: "object",
    fields: [
        {
            name: "label",
            title: "Label",
            type: "string",
        },
    ],
    blockEditor: {
        icon: () => "#",
        render: ({ children }) => (
            <span
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "3px",
                    background: "#111827",
                    color: "#f8fafc",
                    padding: "0 0.3rem",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                }}
            >
                {children}
            </span>
        ),
    },
};
