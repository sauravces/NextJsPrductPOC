import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/home/page'
 
describe('Page', () => {
    it('renders a heading of about page', () => {
        render(<Home />)
        const heading = screen.getByRole('heading', {
          name: /Home/i,
        })
        expect(heading).toBeInTheDocument()
      })
})