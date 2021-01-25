import { Router, Request, Response, NextFunction } from "express";
const router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function auth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("<h1>Can't access</h1>");
}

router.get("/login", (req: Request, res: Response) => {
  res.send(`<form method="POST">
              <label for="email">Email</label><br>
              <input type="email" id="email" name="email"><br>
              <label for="password">password:</label><br>
              <input type="password" id="password" name="password">
              <button>Submit</button>
          </form>`);
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (
    email &&
    password &&
    email === "mioncgp@gmail.com" &&
    password === "asd"
  ) {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Provide email");
  }
});

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`<div>Logged in</div><a href="/logout">Logout</a>`);
  } else {
    res.send(`<div>Logged out</div><a href="/login">Login</a>`);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", auth, (req: Request, res: Response) => {
  res.send("<h1>Welcome to main page</h1>");
});

export { router };
