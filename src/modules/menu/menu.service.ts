import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({ data: createMenuDto });
  }

  findAll() {
    return this.prisma.menu.findMany({ include: { children: true } });
  }

  findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id }, data: updateMenuDto });
  }

  remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
