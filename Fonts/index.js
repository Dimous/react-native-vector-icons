const
    fs = require("fs"),
    path = require("path"),
    glob = require("glob"),
    opentype = require("opentype.js");

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
                        map = {},
                        {
                            glyphs,
                        } = opentype.loadSync(`./${name}.ttf`).glyphs;

                    Object.values(glyphs).forEach(
                        glyph => {
                            map[glyph.name] = glyph.unicode;
                        }
                    );

                    fs.writeFile(`../glyphmaps/${name}.json`, JSON.stringify(map, null, 1), () => { });
                }
            );
    }
);