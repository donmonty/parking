import Business from '../Business'
import * as S from './styled';

export default function ResultList({ list, total }) {
  return (
    <>
      {list.length === 0 ? (
        <p>No results</p>
      ) : (
        <>
          <S.TotalCount>
            <strong>Total: </strong>
            {total ? total : 0}
          </S.TotalCount>
          <S.Unlist>
            {list.map((item) => (
              item && (
                <Business key={item.id} business={item} />
              )
            ))}
          </S.Unlist>
        </>
      )}
    </>
  );
}