import { Prisma } from "@prisma/client";

export class QueryBuilder<T> {
  constructor(
    private query: Record<string, any>,
    private where: Prisma.ListingWhereInput = {}
  ) {}

  search(fields: string[]) {
    const searchTerm = this.query.searchTerm;

    if (searchTerm) {
      this.where.OR = fields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      }));
    }

    return this;
  }

  filter() {
    const excluded = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ];

    Object.keys(this.query).forEach((key) => {
      if (!excluded.includes(key)) {
        (this.where as any)[key] = this.query[key];
      }
    });

    return this;
  }

  paginate() {
    const page = Number(this.query.page || 1);
    const limit = Number(this.query.limit || 10);

    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  sort() {
    return {
      [this.query.sortBy || "createdAt"]:
        this.query.sortOrder || "desc",
    };
  }

  getWhere() {
    return this.where;
  }
}