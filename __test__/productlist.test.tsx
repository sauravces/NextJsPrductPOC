import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import ProductList from '../src/app/product/productList/page';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product table with data', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockProducts });

    render(<ProductList />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByText('Id')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();

      mockProducts.forEach((product) => {
        expect(screen.getByText(product.id.toString())).toBeInTheDocument();
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(screen.getByText(product.price.toString())).toBeInTheDocument();
      });
    });
  });

 it('render create product titel',()=>{
    render(<ProductList/>);
    const title=screen.getByText("Create Product",{exact:false})
    expect(title).toBeInTheDocument();
  })

});
