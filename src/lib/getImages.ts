import { createClient } from "@/utils/supabase/server";

export async function getGalleryImages(artistName?: string) {
  const supabase = await createClient();

  if (artistName) {
    // Get images for specific artist
    const { data: files, error } = await supabase.storage
      .from("artists-public")
      .list(`${artistName}/art`, {
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error(`Error fetching images for ${artistName}:`, error);
      return [];
    }

    return files
      .filter(
        (file) =>
          file.name.toLowerCase().endsWith(".jpg") ||
          file.name.toLowerCase().endsWith(".jpeg") ||
          file.name.toLowerCase().endsWith(".png")
      )
      .map((file) => ({
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/artists-public/${artistName}/art/${file.name}`,
        name: file.name,
      }));
  }

  // Get all artists' images
  const { data: artists, error: artistError } = await supabase.storage
    .from("artists-public")
    .list("", {
      sortBy: { column: "name", order: "asc" },
    });

  if (artistError) {
    console.error("Error fetching artists:", artistError);
    return [];
  }

  // Get images for each artist
  const allImages = await Promise.all(
    artists.map(async (artist) => {
      const { data: files, error } = await supabase.storage
        .from("artists-public")
        .list(`${artist.name}/art`, {
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error(`Error fetching images for ${artist.name}:`, error);
        return [];
      }

      return files
        .filter(
          (file) =>
            file.name.toLowerCase().endsWith(".jpg") ||
            file.name.toLowerCase().endsWith(".jpeg") ||
            file.name.toLowerCase().endsWith(".png")
        )
        .map((file) => ({
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/artists-public/${artist.name}/art/${file.name}`,
          name: file.name,
        }));
    })
  );

  // Flatten array of arrays into single array
  return allImages.flat();
}
