import EventEmitter from 'events'

export const emitter = new EventEmitter()

window._emitter = emitter

export const ADD_GALLERY = 'ADD_GALLERY'
export const UPDATE_MASK = 'UPDATE_MASK'
export const CLICK_BUTTON_PHOTO = 'CLICK_BUTTON_PHOTO'
export const CLICK_BUTTON_SHUTTER = 'CLICK_BUTTON_SHUTTER'
