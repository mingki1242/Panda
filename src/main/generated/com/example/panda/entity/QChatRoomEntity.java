package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatRoomEntity is a Querydsl query type for ChatRoomEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRoomEntity extends EntityPathBase<ChatRoomEntity> {

    private static final long serialVersionUID = -19789284L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatRoomEntity chatRoomEntity = new QChatRoomEntity("chatRoomEntity");

    public final QUserEntity buyer;

    public final NumberPath<Integer> evaluate_buyer = createNumber("evaluate_buyer", Integer.class);

    public final NumberPath<Integer> evaluate_seller = createNumber("evaluate_seller", Integer.class);

    public final BooleanPath is_exit_buyer = createBoolean("is_exit_buyer");

    public final BooleanPath is_exit_seller = createBoolean("is_exit_seller");

    public final BooleanPath is_no_read = createBoolean("is_no_read");

    public final StringPath last_content = createString("last_content");

    public final DateTimePath<java.time.LocalDateTime> last_date = createDateTime("last_date", java.time.LocalDateTime.class);

    public final BooleanPath no_read_buyer = createBoolean("no_read_buyer");

    public final NumberPath<Long> room_id = createNumber("room_id", Long.class);

    public final QUserEntity seller;

    public final QWritingEntity writing;

    public QChatRoomEntity(String variable) {
        this(ChatRoomEntity.class, forVariable(variable), INITS);
    }

    public QChatRoomEntity(Path<? extends ChatRoomEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatRoomEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatRoomEntity(PathMetadata metadata, PathInits inits) {
        this(ChatRoomEntity.class, metadata, inits);
    }

    public QChatRoomEntity(Class<? extends ChatRoomEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.buyer = inits.isInitialized("buyer") ? new QUserEntity(forProperty("buyer")) : null;
        this.seller = inits.isInitialized("seller") ? new QUserEntity(forProperty("seller")) : null;
        this.writing = inits.isInitialized("writing") ? new QWritingEntity(forProperty("writing"), inits.get("writing")) : null;
    }

}

