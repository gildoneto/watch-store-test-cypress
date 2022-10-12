import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard';
import { makeServer } from '@/miragejs/server';
import { cartState } from '../state';

let server;

const mountProductCard = () => {
  const product = server.create('product', {
    title: 'Relógio Bonito',
    price: '22.00',
    image:
      'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  });
  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
  };
};

describe('ProductCard - unit', () => {
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should mount the component', () => {
    const { wrapper } = mountProductCard();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio Bonito');
    expect(wrapper.text()).toContain('$22.00');
  });

  xit('should add item do cartState on button click', async () => {
    const { wrapper } = mountProductCard();
    await wrapper.find('button').trigger('click');

    expect(cartState.items).toHaveLength(1);
  });
});

/**
 * Métodos/propriedades interessantes:
 * wrapper.html()
 * wrapper.classes()
 * wrapper.element
 * wrapper.exists()
 */
