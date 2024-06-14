import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateProduct from '../src/app/product/createProduct/page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CreateProduct', () => {

  it('displays validation errors for invalid form data', async () => {
    render(<CreateProduct />);
    fireEvent.submit(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
      expect(screen.getByText('Price is required')).toBeInTheDocument();
    });
  });

  it('render create product titel',()=>{
    render(<CreateProduct/>);
    const title=screen.getByText("Create Product",{exact:false})
    expect(title).toBeInTheDocument();
  })
  
});