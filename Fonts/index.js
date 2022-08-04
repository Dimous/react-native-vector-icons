const
    fs = require("fs"),
    path = require("path"),
    glob = require("glob"),
    opentype = require("opentype.js");

glob(
    "./*.{ttf,otf}",
    undefined,
    (error, files) => {
        files
            .forEach(
                file => {
                    const
                        map = {},
                        {
                            glyphs: {
                                glyphs,
                            },
                        } = opentype.loadSync(file),
                        file_name = path.basename(file, file.includes("ttf") ? ".ttf" : ".otf");


                    Object
                        .values(glyphs)
                        .forEach(
                            glyph => {
                                map[glyph.name] = glyph.unicode;
                            }
                        );

                    fs.writeFile(`../glyphmaps/${file_name}.json`, JSON.stringify(map, null, 1), () => { });
                }
            );
    }
);