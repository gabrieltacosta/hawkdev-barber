import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
// import SignOutButton from "./sign-out-button"

const Header = () => {
    return (
        <Card className="rounded-none">
            <CardContent className="flex justify-between items-center p-5">
                <Image src="/logo.svg" alt="FSW Barber" height={18} width={120} />
                <Button size="icon" variant="outline" >
                    <MenuIcon />
                </Button>
                {/* <SignOutButton /> */}
            </CardContent>
        </Card>
    )
}

export default Header