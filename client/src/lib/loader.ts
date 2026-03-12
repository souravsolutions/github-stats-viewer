export const LOADER_SRC =
  "https://lottie.host/c9fe1485-a771-4311-8988-d75141a28651/VNw81E9P8o.lottie";

export function prefetchLoader(): void {
  void fetch(LOADER_SRC, {
    mode: "cors",
    cache: "force-cache",
  }).catch(() => null);
}
