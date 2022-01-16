export const createParallaxOptions = ({ imagePath, height }: {
    imagePath?: string, height: number
}) => {
    if (!imagePath) return null;
    return {
        backgroundImage: `url(${imagePath})`,
        minHeight: height,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
    };
}