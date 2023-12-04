export enum CategorType {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Sport = 'Sport',
  Accessories = 'Accessories',
  Furniture = 'Furniture',
}

export interface ICategory {
  type: CategorType;
  src: string;
}

export const categories = [
  {
    type: CategorType.Electronics,
    src: 'https://www.codrey.com/wp-content/uploads/2017/12/Consumer-Electronics-1.png',
  },
  {
    type: CategorType.Clothing,
    src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
  },
  {
    type: CategorType.Sport,
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixhbc7ycFoiUl4VXHb9PJNa8qqhMzDrgc7o5wnFTFQl9pzOr4zeMjbP9YjHb2LE73SrQzqHNQqzWSomEKzu9cpVXA2WpKfwR3TPqaWTHVXiPZvjSKECnF6m-zWzNUt-pD3puDyums0w1uVTvZQqx-w29R6---Wy7xghCVCqPpQ6yHSvgYIaYceNvQUhcDa/w640-h352/I%20Love%20Sports.jpeg',
  },
  {
    type: CategorType.Accessories,
    src: 'https://img.freepik.com/premium-photo/view-women-bag-stuff_93675-65272.jpg?w=996',
  },
  {
    type: CategorType.Furniture,
    src: 'https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.webp?b=1&s=170667a&w=0&k=20&c=7n4U6vnFtYrX-FE84s2GXIzqkBIkvPTAE2uG8mB8MLA=',
  },
];
