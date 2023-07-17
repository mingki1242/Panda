package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWritingCompleteEntity is a Querydsl query type for WritingCompleteEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWritingCompleteEntity extends EntityPathBase<WritingCompleteEntity> {

    private static final long serialVersionUID = 1977723826L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWritingCompleteEntity writingCompleteEntity = new QWritingCompleteEntity("writingCompleteEntity");

    public final StringPath category = createString("category");

    public final StringPath detail_category = createString("detail_category");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final QUserEntity userEntity;

    public final NumberPath<Integer> wid = createNumber("wid", Integer.class);

    public final StringPath writing_name = createString("writing_name");

    public final ArrayPath<byte[], Byte> writing_photo = createArray("writing_photo", byte[].class);

    public QWritingCompleteEntity(String variable) {
        this(WritingCompleteEntity.class, forVariable(variable), INITS);
    }

    public QWritingCompleteEntity(Path<? extends WritingCompleteEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWritingCompleteEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWritingCompleteEntity(PathMetadata metadata, PathInits inits) {
        this(WritingCompleteEntity.class, metadata, inits);
    }

    public QWritingCompleteEntity(Class<? extends WritingCompleteEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
    }

}

