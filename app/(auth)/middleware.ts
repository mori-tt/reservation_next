import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // TODO: ここで認証後の処理を行う
    // TODO: req.nextauth に認証情報が入っている
  },
  {
    callbacks: {
      authorized: (nextauth) => {
        console.log("authorized", nextauth, nextauth.req.url);
        if (
          nextauth.req.url.startsWith("http://localhost:3000/cosmos") ||
          nextauth.req.url.endsWith("/login") ||
          nextauth.req.url.endsWith("/")
        )
          return true;
        else if (!nextauth.token) return false;
        else if (nextauth.req.url.endsWith("/admin"))
          return nextauth.token?.role === "admin";
        else return true;
      },
    },
  },
);
