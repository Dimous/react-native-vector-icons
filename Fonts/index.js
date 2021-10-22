const opentype = require("opentype.js"), fs = require("fs"), path = require("path"), glob = require("glob");

glob(
    "./*.ttf",
    undefined,
    (error, files) => {
        files
            .map(
                file => path.basename(file, ".ttf")
            )
            .forEach(
                name => {
                    const
                        map = {};

                    Object.values(opentype.loadSync(`./${name}.ttf`).glyphs.glyphs).forEach(
                        glyph => {
                            map[glyph.name] = glyph.unicode;
                        }
                    );

                    fs.writeFile(`../glyphmaps/${name}.json`, JSON.stringify(map), () => { });
                }
            );
    }
);