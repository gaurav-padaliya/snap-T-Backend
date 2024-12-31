import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new menu
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({ data: createMenuDto });
  }

  // Helper function to generate nested include structure
  private generateNestedInclude(levels: number) {
    const include = {};
    let currentLevel = include;
    for (let i = 0; i < levels; i++) {
      currentLevel['children'] = { include: {} };
      currentLevel = currentLevel['children'].include;
    }
    currentLevel['children'] = true;
    return include;
  }

  // Fetch all menus with nested children
  async findAll() {
    const menus = await this.prisma.menu.findMany({
      where: { parentId: null }, // Fetch only root-level menus
      include: this.generateNestedInclude(10), // Adjust the level as needed
    });
    return menus;
  }

  // Fetch a single menu by ID with all nested children
  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: this.generateNestedInclude(10), // Adjust the level as needed
    });
    return menu;
  }

  // Update a menu
  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id }, data: updateMenuDto });
  }

  // Delete a menu
  remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
