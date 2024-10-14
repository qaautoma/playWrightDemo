import { faker } from "@faker-js/faker";

export const fakeTestData = {
    login: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }
}

