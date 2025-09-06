// /src/lib/api.test.ts
import axios from "axios";
import { getContentPages } from "./api";

// Mock axios so we don't hit a real Strapi server
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getContentPages", () => {
  it("fetches content pages from Strapi", async () => {
    const mockData = {
      data: [
        { id: 1, attributes: { title: "About Us", slug: "about-us" } },
        { id: 2, attributes: { title: "Contact", slug: "contact" } },
      ],
    };

    // Mock axios methods
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    // Call the function
    const result = await getContentPages();

    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledWith("/content-pages");
    expect(result).toEqual(mockData);
  });
});
