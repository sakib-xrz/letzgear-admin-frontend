import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo/telehealth-logo.png";

import { Button } from "antd";

export default function PublicNavbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-2 xs:gap-5">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="telehealth logo"
              className="w-auto cursor-pointer max-xs:h-5 xs:h-8 sm:h-10"
              quality={100}
              loading="eager"
            />
          </Link>

          {/* small button for mobile */}
          <div className="flex items-center gap-3 xs:hidden">
            <Link href={"/login"}>
              <Button size="small">Sign in</Button>
            </Link>

            <Link href={"/register"}>
              <Button type="primary" size="small">
                Sign up
              </Button>
            </Link>
          </div>

          {/* base button for large device */}
          <div className="hidden items-center gap-3 xs:flex">
            <Link href={"/login"}>
              <Button>Sign in</Button>
            </Link>

            <Link href={"/register"}>
              <Button type="primary">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
