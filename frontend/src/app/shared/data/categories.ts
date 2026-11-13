import type { CategoryItem } from '../models/category.type';

export const CATEGORIES: readonly CategoryItem[] = [
  { name: 'Alimentação', icon: 'utensils', description: 'Restaurantes, cafés e bares' },
  { name: 'Saúde e bem-estar', icon: 'heart', description: 'Clínicas, academias e cuidados' },
  { name: 'Beleza e estética', icon: 'sparkles', description: 'Salões, estética e autocuidado' },
  { name: 'Comércio e lojas', icon: 'shopping-bag', description: 'Lojas físicas e online' },
  { name: 'Casa e construção', icon: 'house', description: 'Reformas, materiais e serviços' },
  { name: 'Automóveis e transporte', icon: 'car', description: 'Oficinas, mobilidade e veículos' },
  { name: 'Educação', icon: 'graduation-cap', description: 'Escolas, cursos e aprendizado' },
  { name: 'Turismo e hospedagem', icon: 'compass', description: 'Viagens, hotéis e passeios' },
  { name: 'Tecnologia', icon: 'monitor', description: 'Produtos e serviços digitais' },
  { name: 'Outros serviços', icon: 'grid', description: 'Serviços para o dia a dia' }
];
