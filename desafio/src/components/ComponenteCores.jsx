import { useState } from "react";

// Função que retorna uma string com uma cor aleatória em hexadecimal 
function randomHexColor() {
    return (
        "#" +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
    );
}

export default function ComponenteCores() {
    // Array de cores [{ hex: "#aabbcc", locked: false }]
    const [paleta, setPaleta] = useState([
        { hex: "#B31FF2", locked: false },
        { hex: "#B31FF2", locked: false },
        { hex: "#B31FF2", locked: false },
        { hex: "#B31FF2", locked: false },
        { hex: "#B31FF2", locked: false }
    ]);

    function gerarNovaPaleta() {
        setPaleta(
            paleta.map((cor) =>
                cor.locked ? cor : { hex: randomHexColor(), locked: false }
            )
        );
    }

    function copiarColor(hex) {
        navigator.clipboard.writeText(hex);
    }

    function toggleLock(index) {
        setPaleta(
            paleta.map((cor, i) =>
                i === index ? { ...cor, locked: !cor.locked } : cor
            )
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-grey-200">
            <div className="p-4 flex justify-center">
                <button
                    onClick={gerarNovaPaleta}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                >
                    🎨 Gerar Nova Paleta
                </button>
            </div>

            <div className="flex flex-row flex-1">
                {paleta.map((cor, index) => (
                    <div
                        key={index}
                        className="w-1/5 flex flex-col justify-between items-center p-4"
                        style={{ backgroundColor: cor.hex }}
                    >
                        {/* Texto da cor */}
                        <p className="text-white text-lg font-bold drop-shadow-lg">
                            {cor.hex}
                        </p>

                        {/* Botones */}
                        <div className="flex flex-col gap-2 w-full mt-4">
                            <button
                                className="w-full px-2 py-1 rounded shadow hover:bg-blue-300"
                                onClick={() => copiarColor(cor.hex)}
                            >
                                ✂️ Copiar
                            </button>
                            <button
                                className={`w-full px-2 py-1 rounded shadow text-white ${cor.locked
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-green-600 hover:bg-green-700"
                                    }`}
                                onClick={() => toggleLock(index)}
                            >
                                {cor.locked ? "🔒 Bloqueado" : "🔓 Desbloquear"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
