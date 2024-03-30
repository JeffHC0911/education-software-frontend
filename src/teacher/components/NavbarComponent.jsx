
"use client";
// import Image from "next/image";
import { useAuthStore } from '../../hooks'
import { MagnifyingGlass } from "phosphor-react";
import { Navbar, Button } from "keep-react";
import Logo from '../../assets/img/fondo2.svg'

export const NavbarComponent = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <Navbar fluid={true}>
            <Navbar.Container className="flex items-center justify-between">
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
                        <Navbar.Link linkName="Register Students" href='/register-student' />
                        <Navbar.Link linkName="About" />
                    </Navbar.Container>
                    <Navbar.Collapse collapseType="sidebar">
                        <Navbar.Container tag="ul" className="flex flex-col gap-5">
                            <Navbar.Link linkName="Home" />
                            <Navbar.Link linkName="Create Course" href='/create-course' />
                            <Navbar.Link linkName="Register Students" href='/register-student' />
                            <Navbar.Link linkName="About" />
                        </Navbar.Container>
                    </Navbar.Collapse>
                </Navbar.Container>

                <Navbar.Container className="flex gap-2">
                    <button
                        className="btn btn-outline-danger"
                        onClick={startLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        &nbsp;
                        <span>Salir</span>
                    </button>
                    <Button size="sm" type="link">
                        <span>
                            <MagnifyingGlass size={20} color="#444" />
                        </span>
                        <span className="ml-2 text-metal-600">Search</span>
                    </Button>
                    <Navbar.Toggle />
                </Navbar.Container>
            </Navbar.Container>
        </Navbar>
    );
}
