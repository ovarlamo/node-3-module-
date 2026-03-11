const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "add new note",
  handler() {
    console.log("add command");
  },
});

yargs.command({
  command: "list",
  describe: "print all nodes",
  handler() {
    console.log("list command1");
  },
});

const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");
const { type } = require("os");

yargs.command({
  command: "edit",
  describe: "edit note",
  builder: {
    title: {
      type: "string",
      describe: "title note",
      demandOption: true,
    },
    id: {
      type: "string",
      describe: "note id",
      demandOption: true,
    },
  },
  handler({ id, title }) {
    console.log("edit command", id, title);
    updateNote({ id, title });
  },
});
yargs.parse();

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title });
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
