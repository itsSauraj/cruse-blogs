import { useEffect, useRef } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";
import { logoutUserHandeler } from "@/utils/functions";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDownSearch = (event: globalThis.KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        ref.current?.focus();
      }
    };

    const handleKeyDownEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        ref.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDownSearch);
    window.addEventListener("keydown", handleKeyDownEsc);

    return () => {
      window.removeEventListener("keydown", handleKeyDownSearch);
      window.removeEventListener("keydown", handleKeyDownEsc);
    };
  }, []);

  return (
    <Input
      ref={ref}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
};

export const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SAURAJ</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              key={item.href}
              className="data-[active=true]:text-primary data-[active=true]:font-medium"
              isActive={
                pathname === item.href || pathname.startsWith(item.href)
              }
            >
              <NextLink color="foreground" href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SearchInput />
        </NavbarItem>
        {!(pathname.startsWith("/auth") || pathname.includes("dashboard")) && (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button
              as={Link}
              color="primary"
              href="/auth/signin"
              variant="flat"
            >
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden  basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              {item.label.toLowerCase() === "logout" ? (
                <Link
                  className="cursor-pointer"
                  color="danger"
                  onPress={logoutUserHandeler}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  color={
                    pathname === item.href || pathname.startsWith(item.href)
                      ? "primary"
                      : "foreground"
                  }
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
