    import express from "express"
    import path from "path"

    const app = express();
    const port = 4000;

    const p=path.join(process.cwd(), 'src/test/public')
    console.log(p)
    app.use("/public", express.static(p));

    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });
