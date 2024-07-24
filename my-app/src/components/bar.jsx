export default function Bar({ height }) {
    return (
      <div
        className="bar"
        style={{
          height: `${height}%`,
          width: '20px',
          backgroundColor: 'lightblue',
          display: 'inline-block'
        }}
      ></div>
    );
  }