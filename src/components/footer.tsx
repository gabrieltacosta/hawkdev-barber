import { Card, CardContent } from "./ui/card"

const Footer = () => {
    return (
        <footer>
            <Card className="rounded-none">
                <CardContent className="px-5 py-6 flex items-center justify-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} <span className="font-bold">FSW Barber</span> | Todos os direitos reservados.
                    </p>
                </CardContent>
            </Card>
        </footer>
    )
}

export default Footer