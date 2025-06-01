import { useState, useEffect } from "react";
import p5 from "p5";
import { makeSprite } from "./sprite-sketch"; // Make sure this is correct
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./App.css";

function App() {
    const [grid, setGrid] = useState();
    const [count, setCount] = useState();
    const [sprites, setSprites] = useState([]);

    const generateSprites = (_grid, _count) => {
        let newSprites = [];

        for (let n = 0; n < Math.min(_count, 10); n++) {
            const sketch = (p) => {
                p.setup = () => {
                    p.noCanvas(); // Don't create default canvas
                    p.noLoop();

                    const pg = p.createGraphics(196, 196); // Offscreen canvas
                    pg.background(p.random(0));
                    makeSprite(p, pg, _grid); // Pass p, pg, grid
                    const dataURL = pg.canvas.toDataURL("image/png");
                    newSprites.push(dataURL);

                    if (newSprites.length === Math.min(_count, 10)) {
                        setSprites(newSprites); //Sprite URLs are set only once, useEffect picks it up
                    }

                    // Clean up instance
                    p.remove();
                };
            };

            new p5(sketch);
        }
    };

    //Testing the data URLs
    // useEffect(() => {
    //     if (sprites.length > 0) {
    //         console.log("Sprites updated!", sprites);
    //     }
    // }, [sprites]);

    const saveSprite = (url, index) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `sprite-#${index + 1}.png`;
        link.click();
    };
    const downloadZip = () => {
        const zip = new JSZip();
        const folder = zip.folder("sprites");

        sprites.forEach((dataUrl, index) => {
            const base64 = dataUrl.split("base64,")[1];
            folder.file(`sprite-#${index + 1}.png`, base64, { base64: true });
        });

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "sprites.zip");
        });
    };

    return (
        <div className="">
            <h1 className="text-5xl font-bold text-center mb-12">
                Sprite Generator
            </h1>

            <form
                className="flex flex-col items-center space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (isNaN(+grid) || isNaN(+count)) {
                        alert("Enter both numbers");
                    }

                    // console.log(grid);
                    // console.log(count);
                    let _grid = +grid;
                    let _count = +count;
                    generateSprites(_grid, _count);
                    // console.log(sprites);
                }}
            >
                <input
                    placeholder="Grid Size"
                    className="px-6 py-4 text-xl text-black bg-white border border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setGrid(e.target.value)}
                />
                <input
                    placeholder="Count (max 10)"
                    className="px-6 py-4 text-xl text-black bg-white border border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setCount(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                    Generate
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mt-10">
                {sprites.length > 0 ? (
                    sprites.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            height={150}
                            width={150}
                            className="hover:cursor-pointer m-2"
                            onClick={() => saveSprite(url, index)}
                        />
                    ))
                ) : (
                    <p className="text-center text-bold col-span-5  text-2xl font-bold">
                        No Sprites Generated
                    </p>
                )}
                {sprites.length > 0 ? (
                    <div className="col-span-5 flex justify-center mt-6">
                        <button
                            className="text-2xl font-bold px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition"
                            onClick={() => downloadZip()}
                        >
                            Download ZIP
                        </button>
                    </div>
                ) : null}
            </div>

            <p className="text-2xl m-4">
                This project uses a port of a Processing Java Sketch to p5.js to
                generate block sprites based on a simple set of rules. Consider
                a canvas of n by n squares, if 'n' is even, randomly colour in
                the left half squares and mirror the right half squares. If 'n'
                is odd, the middle column is randomly coloured. Even for such a
                simple rule set, a wide array of possiblities arise, for even
                'n', there are 2
                <sup className="font-bold">
                    n<sup>2</sup>/2
                </sup>{" "}
                possible sprites and for odd 'n', there are 2
                <sup className="font-bold">
                    (n<sup>2</sup>+n)/2
                </sup>
                <br />
                <br />
                Click on the images to download them or zip them all. Processing
                Sketch with explaination is{" "}
                <a
                    href="https://github.com/Mystery-Coder/Sprite-Generator"
                    target="_blank"
                    className="text-green-500"
                >
                    here.
                </a>
                <br />
                If you liked this, please leave a ⭐ at{" "}
                <a
                    href="https://github.com/Mystery-Coder/sprite-react-p5"
                    target="_blank"
                    className="text-white font-bold"
                >
                    Sprite Generator
                </a>
            </p>
        </div>
    );
}

export default App;
