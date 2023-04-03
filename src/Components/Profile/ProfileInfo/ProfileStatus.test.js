import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus Component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'nika'} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('nika')
    });
    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status={'nika'} />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={'nika'} />);
        const root = component.root;
        expect(()=>{
            let input = root.findByType('input')
        }).toThrow()
    })
    test('after creation <span> should contains corret status', () => {
        const component = create(<ProfileStatus status={'nika'} />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('nika')
    })
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status={'nika'} />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe('nika');
    })
    test('callback should be called', () => {
        const mockCallBack = jest.fn(); 
        const component = create(<ProfileStatus status={'nika'} updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    })
})