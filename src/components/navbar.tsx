"use client";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LogoutFn } from "../../actions/auth/logout";
import { useCurrentUserRole } from "../../hooks/use-current-user-role";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const handdlelgoout = () => {
    LogoutFn();
  };

  const userRole = useCurrentUserRole();

  let user = false;

  let isAdmin = false;

  console.log(userRole, "hello");
  if (userRole === "ADMIN") {
    user = true;
    isAdmin = true;
  } else {
    user = true;
    isAdmin = false;
  }

  return (
    <nav className="sticky z-[100] h-14  inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex md:px-32 px-20 h-14 items-center justify-between border-b border-zinc-200 ">
          <Link href={"/"} className="flex z-40 font-semibold">
            <span className="text-yellow-500">Scrimba.</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={"/login"}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "",
                      variant: "ghost",
                    })
                  )}>
                  Sign out
                </Link>
                {/* <div className=" h-8 w-px bg-zinc-200 hidden sm:block" /> */}
                {isAdmin ? (
                  <Link
                    href={"/admin"}
                    className={cn(
                      buttonVariants({ size: "sm", variant: "ghost" })
                    )}>
                    Dashboard 🌟
                  </Link>
                ) : null}
                <Link
                  href={"/configure/upload"}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className:
                        "hidden sm:flex bg-yellow-500  hover:bg-yellow-600 text-white items-center gap-1",
                    })
                  )}>
                  Shop Now
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/register"}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" })
                  )}>
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" })
                  )}>
                  Login
                </Link>
                <div className=" h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href={"/configure/upload"}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex text-white items-center gap-1",
                    })
                  )}>
                  Shop Now
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
