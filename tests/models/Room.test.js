const supabase = require('../../src/libs/supabase');
const RoomModel = require('../../src/models/Room');

describe('RoomModel', () => {
  const name = "testRoom";
  const userId = 1;

  describe("Room#create", () => {
    // 正常系
    it("正常なルーム名と作成者のidが渡された場合、問題なく登録できる", async () => {
      
      // delete before
      await supabase.from('rooms').delete().match({name: name});
      
      // act
      const room = await RoomModel.create(name, userId);
      
      // assert
      expect(room).not.toBeNull();
      expect(room.name).toBe(name);
      expect(room.user_id).toBe(userId);

      // delete after
      await supabase.from('rooms').delete().match({name: name});
    })
  })

  describe('Room#update', () => {
    // 正常系
    it('正常な更新情報が与えられた場合、問題なく更新できるか', async () => {
      const room = await supabase
        .from('rooms')
        .insert({name: name, user_id: userId})
        .single();

      const updateData = {name: "updatedName", description: "updatedDescription"};

      const updatedRoom = await Room.update(room.id, data);
      expect(updatedRoom).not.toBeNull();
      expect(updatedRoom.name).toBe(updateData.name);
    })

    // TODO: 異常系
  })
});