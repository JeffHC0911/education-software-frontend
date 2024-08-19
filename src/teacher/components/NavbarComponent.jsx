
"use client";
// import Image from "next/image";
import { useAuthStore } from '../../hooks'
import { MagnifyingGlass, SignOut } from "phosphor-react";
import { Navbar, Button } from "keep-react";
import Logo from '../../assets/img/fondo2.svg'

export const NavbarComponent = () => {

    const { startLogout } = useAuthStore();

    return (
        <Navbar fluid={true}>
            <Navbar.Container className="flex items-center justify-between lg:shadow-md lg:rounded-lg lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-10 lg:bg-white">
                <Navbar.Container className="flex items-center">
                    <Navbar.Brand>
                        {/* <Image
                            src="/images/keep.svg"
                            alt="keep"
                            width="100"
                            height="40"
                        /> */}
                        <img src={Logo} alt="logo" width="50" height="20" />
                    </Navbar.Brand>
                    <Navbar.Divider></Navbar.Divider>
                    <Navbar.Container
                        tag="ul"
                        className="lg:flex hidden items-center justify-between gap-8"
                    >
                        <Navbar.Link linkName="Home" />
                        <Navbar.Link linkName="Create Course" href='/create-course' />
                        <Navbar.Link linkName="About" />
                    </Navbar.Container>
                    <Navbar.Collapse collapseType="sidebar">
                        <Navbar.Container tag="ul" className="flex flex-col gap-5">
                            <Navbar.Link linkName="Home" />
                            <Navbar.Link linkName="Create Course" href='/create-course' />
                            <Navbar.Link linkName="About" />
                        </Navbar.Container>
                    </Navbar.Collapse>
                </Navbar.Container>

                <Navbar.Container className="flex gap-2">
                    <button
                        className="btn btn-outline-danger lg:mr-4"
                        onClick={startLogout}
                    >
                        <SignOut size={25} color="#FF0000" />
                        {/* <span className=' text-2xl lg:text-lg'>Salir</span> */}
                    </button>
{/*                     <Button size="sm" type="link">
                        <span>
                            <MagnifyingGlass size={20} color="#444" />
                        </span>
                        <span className="ml-2 text-metal-600 text-2xl">Search</span>
                    </Button> */}
                    <Navbar.Toggle />
                </Navbar.Container>
            </Navbar.Container>
        </Navbar>
    );
}
