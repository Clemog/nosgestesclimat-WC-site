import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { situationSelector } from 'Selectors/simulationSelectors'
import { AddAnswer } from '../sites/publicodes/API';
import './PopUpEnd.css';

const PopUpEnd = ({ isOpen, closeModal, children }) => {

  const situation = useSelector(situationSelector),
    query = new URLSearchParams(useLocation().search),
    score = query.get('total')

  situation["total"] = score

  if (!isOpen) return null;
  return (
    <div className="popup-parent">
      <div className="popup-content" >
        <div css="position: relative">
          <button css="position: absolute; top:0; right:0; margin: 1rem" className="ui__ small button" onClick={closeModal}>
            x
          </button>
        </div>
        {children}
        <div className="div-buttons"
          css={`
              > button {
                margin: 1rem; 
                width: 15rem;
              }
            `}
        >
          <button className="ui__ small button" onClick={closeModal}>
            Je ne souhaite pas partager ma simulation
          </button>
          <button
            className="ui__ small plain button"
            onClick={closeModal}
            onMouseUp={
              () => AddAnswer(situation).then((response) => {
                console.log('API response', response)
                // set app state
              }).catch((error) => {
                console.log('API error', error)
              })
            }
          >
            Je partage ma simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpEnd;