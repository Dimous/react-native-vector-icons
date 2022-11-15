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
                        {
                            glyphs: {
                                glyphs,
                            },
                        } = opentype.loadSync(file),
                        file_name = path.basename(file, file.includes("ttf") ? ".ttf" : ".otf");

                    fs.writeFile(
                        `../glyphmaps/${file_name}.json`,
                        JSON.stringify(
                            Object
                                .values(glyphs)
                                .reduce(
                                    (previous, current) => {
                                        previous[current.name] = current.unicode;

                                        return previous;
                                    },
                                    {}
                                ),
                            null,
                            1
                        ),
                        () => { }
                    );
                }
            );
    }
);