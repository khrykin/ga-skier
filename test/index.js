import { Bone } from '../src';
import expect from 'expect';

const json = JSON.stringify;

describe('BodyPart', () => {
  let arm = new Bone('arm', null, { length: 100 });

  it('should set length', () => {
    expect(arm.length).toEqual(100);
  });

  it('should attach single part', () => {
    let { children: { hand } } = arm.attach('hand', { length: 20 });
    expect(hand.length).toEqual(20);
    expect(hand.parent).toEqual(arm);
    expect(json(hand.start))
    .toEqual(json(arm.end));
    expect(arm.children.hand).toEqual(hand);
  });

  it('should attach nultiple parts', () => {
    const hand = arm.children.hand;
    hand
      .attach('finger1', { length: 2 })
      .attach('finger2', { length: 5 })
      ;
    expect(hand.children.finger1.length).toEqual(2);
    expect(hand.children.finger2.length).toEqual(5);
    expect(finger1.parent).toEqual(hand);
    expect(finger2.parent).toEqual(hand);

  });
});
