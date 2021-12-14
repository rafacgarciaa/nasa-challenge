import Masonry from "react-masonry-component";

import config from "../../config";

interface IProps {
  items: Array<{
      id: number;
      src: string;
  }>;
}

export const GridImage = (props: IProps) => (
    <Masonry
        className={"masonry-container"}
        elementType={"div"}
        options={config.settings.mansory}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
    >
        {props.items.map(item => {
            return (
            <div key={item.id} className="masonry-element">
                <img src={item.src} style={{ width: 300 }} alt={`${item.id}`} />
            </div>
            );
        })}
    </Masonry>
);