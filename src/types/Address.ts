export type Address = {
  name: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
};

export type AddressResponse = Address & {
  id: number;
};
