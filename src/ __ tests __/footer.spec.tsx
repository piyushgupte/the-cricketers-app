import '@testing-library/jest-dom'
import { render,screen } from "@testing-library/react"
import Footer from "./../components/layout/footer"



test("Renders the main page", () => {
    render(<Footer />)
    expect(screen.getByText(`The Cricketer App`)).toBeInTheDocument();
})